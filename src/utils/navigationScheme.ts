import deviceInfoStore from 'stores/vanillaStore.deviceInfo';

const navigationScheme = () => {
  const isWebview = deviceInfoStore.getState().deviceInfo.isWebView;

  return {
    openWeb: (href: string) => {
      const pathname = new URL(href, location.origin);

      if (!isWebview) return window.open(pathname, '_blank');

      return (location.href = `unimate://open?url=${encodeURIComponent(
        pathname.toString()
      )}`);
    },
    closeWeb: () => {
      if (!isWebview) return window.close();

      return (location.href = 'unimate://close');
    },
    shareContent: (url: string, title: string, message: string) => {
      if (!isWebview) return;

      return (location.href = `unimate://share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}`);
    },
    goHome: () => {
      return (location.href = 'unimate://home');
    },
    logout: () => {
      return (location.href = 'unimate://logout');
    },
  };
};

export default navigationScheme;
