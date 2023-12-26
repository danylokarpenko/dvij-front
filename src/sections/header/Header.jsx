import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as FGTextSvg } from '../../assets/FGText.svg';
import { ReactComponent as IdeaSvg } from '../../assets/idea.svg';
import ResponsiveDialog from '../../components/modal/modal';

import IdeaForm from '../../components/Forms/IdeaForm';
import { fetchIdeas } from '../../store/ideas/ideaActions';
import IdeaItems from './components/idea-items';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  const [ideasModalOpen, setOpenIdeasModal] = React.useState(false);
  const [ideaFormModalOpen, setIdeaFormModalOpen] = React.useState(false);
  const userId = Number(localStorage.getItem('userId'));
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  console.log(location.pathname);

  useEffect(() => {
    if (isLogin) return;
    dispatch(fetchIdeas());
  }, [isLogin]);

  if (isLogin) return null;

  const openIdeasModal = () => {
    setOpenIdeasModal(true);
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}
    >
      {/* First Modal with ideas list */}
      <ResponsiveDialog
        open={ideasModalOpen}
        setOpen={setOpenIdeasModal}
        isFullScreen={true}
        title="Ideas"
      >
        <IdeaItems setIdeaFormModalOpen={setIdeaFormModalOpen} />
        {/* Inner modal with create idea form */}
        <ResponsiveDialog
          open={ideaFormModalOpen}
          setOpen={setIdeaFormModalOpen}
        >
          <IdeaForm
            idea={{ creatorId: userId }}
            callback={() => setIdeaFormModalOpen(false)}
          />
        </ResponsiveDialog>
      </ResponsiveDialog>
      <div style={{ flex: 1 }}></div>
      <FGTextSvg width={100} height={100} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
        <IdeaSvg
          style={{ margin: '5px 3px', cursor: 'pointer' }}
          width={45}
          height={45}
          onClick={openIdeasModal}
        />
      </div>
    </header>
  );
}
