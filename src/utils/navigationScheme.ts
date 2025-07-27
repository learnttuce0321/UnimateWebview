import { initializeStore } from 'stores/createAppStore';

const navigationScheme = () => {
  const { isWebview } = initializeStore().getState();

  return {
    openWeb: (href: string) => {
      const pathname = new URL(href, location.origin);

      if (!isWebview) return window.open(pathname, '_blank');

      return (location.href = `neapp://?openweb=${encodeURIComponent(
        pathname.toString()
      )}`);
    },
    closeWeb: () => {
      if (!isWebview) return window.close();

      return (location.href = 'neapp://?applink=webClose');
    },
  };
};

export default navigationScheme;
