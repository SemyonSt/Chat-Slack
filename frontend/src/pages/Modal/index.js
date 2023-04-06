import AddChannelModal from './AddChannel';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';

const modals = {
  add: AddChannelModal,
  rename: RenameChannelModal,
  delete: DeleteChannelModal,
};

export default (modalName) => modals[modalName];
