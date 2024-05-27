import React from 'react';

const PageContext = React.createContext(() => {});

const PageTypes = Object.freeze({
  CREATE: 'create',
  EDIT: 'edit',
  VIEW: 'view'
});

export function PageProvider(props) {
  const [id, setId] = React.useState(-1);
  const [pageType, setPageType] = React.useState('');
  const value = React.useMemo(() => {
    
    const isCreatePageType = () => {
      return pageType === PageTypes.CREATE;
    };
    
    const isEditPageType = () => {
      return pageType === PageTypes.EDIT;
    };

    const isViewPageType = () => {
      return pageType === PageTypes.VIEW;
    };

    const setCreatePageType = () => {
      setPageType(PageTypes.CREATE);
    };

    const setEditPageType = () => {
      setPageType(PageTypes.EDIT);
    };

    const setViewPageType = () => {
      setPageType(PageTypes.VIEW);
    };

    return {
      id,
      setId,
      isCreatePageType,
      isEditPageType,
      isViewPageType,
      setCreatePageType,
      setEditPageType,
      setViewPageType
    };
  }, [id, pageType]);

  return <PageContext.Provider value={value} {...props} />;
}

export function usePage() {
  const context = React.useContext(PageContext);

  if (!context) {
    throw new Error(
      'usePage should be inside the provider PageContext',
    );
  }

  return context;
}
