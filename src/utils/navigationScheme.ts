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
  };
};

export default navigationScheme;
