import { RefreshScheme, RequestHandler, ExpiredAuthSessionError } from '~auth/runtime'

export default class CustomRefreshScheme extends RefreshScheme {
  constructor($auth, options) {
    super($auth, options);
    this.requestHandler = new CustomRequestHandler(this, this.$auth.ctx.$axios);
  }
}

class CustomRequestHandler extends RequestHandler {
  initializeRequestInterceptor(refreshEndpoint) {
    this.interceptor = this.axios.interceptors.request.use(async (config) => {
      if (!this._needToken(config) || config.url === refreshEndpoint) {
        return config;
      }
      const {
        valid,
        tokenExpired,
        refreshTokenExpired,
        isRefreshable
      } = this.scheme.check(true);
      let isValid = valid;
      if (refreshTokenExpired) {
        this.scheme.reset();
        throw new ExpiredAuthSessionError();
      }
      if (tokenExpired) {
        if (!isRefreshable) {
          this.scheme.reset();
          throw new ExpiredAuthSessionError();
        }
        // changed from this.scheme.refreshTokens() to utilize the RefreshController's ability to prevent duplicate refresh requests
        isValid = await this.scheme.refreshController.handleRefresh().then(() => true).catch(() => {
          this.scheme.reset();
          throw new ExpiredAuthSessionError();
        });
      }
      const token = this.scheme.token.get();
      if (!isValid) {
        if (!token && this._requestHasAuthorizationHeader(config)) {
          throw new ExpiredAuthSessionError();
        }
        return config;
      }
      return this._getUpdatedRequestConfig(config, token);
    });
  }
}
