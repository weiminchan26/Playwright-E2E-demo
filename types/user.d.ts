export type UserEntity = {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    companyName: string;
    role: string;
    avatar: string;
    shopDomain: string;
    connectedToShopify: boolean;
    storeDescription: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    productCategories: any[];
    timeZone: string;
    accountInfoComplated: boolean;
    connectedToSocialPlatform: boolean;
    bindToShopifyDomain: boolean;
    hasShowGuid: boolean;
    showAppNotification: boolean;
    shopifyFeedback: {
      bannerStatus: 'initial' | 'open' | 'closed';
    };
    showFestiveOffer: boolean;
    downloadedPicture: boolean;
    showCampaignOnboarding: boolean;
  };
  isPossessed: boolean;
  tenantId: number;
  tenantIdSign: string;
  connectedToShopify: boolean;
  registerTime: string;
  transients: {
    shopifyConnectionStatus:
      | 'unconnected' //从未连接过
      | 'connected' //已连接
      | 'disconnected'; //断开连接
  };
};