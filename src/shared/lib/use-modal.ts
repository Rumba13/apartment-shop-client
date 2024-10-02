import React, { useState } from 'react';

type UseModalOptionsType = {
  parentModalSelector?: string;
};

function findParentModal(sharedNodeSelector: string) {
  let parentModal: Element | Document | null;

  parentModal = document.querySelector(sharedNodeSelector);

  if (parentModal === null) {
    parentModal = document;
  }

  return parentModal;
}
export function useModal(isOpenedByDefault = false, options: UseModalOptionsType = {}) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(isOpenedByDefault);

  const parentModal = options.parentModalSelector ? findParentModal(options.parentModalSelector) : document;

  parentModal.addEventListener('click', event => {
    setIsModalOpened(false);
  });

  function toggleModal(event: React.MouseEvent) {
    if (isModalOpened) {
      event.stopPropagation();
    }

    setTimeout(() => setIsModalOpened(!isModalOpened), 0);
    //its need to avoid event absorption by e.stopPropagation
    //Without that "setTimeout" and "if (isModalOpened){...}" other modals won't close with click on element contains e.stopPropagation like modals buttons
  }

  function stopPropagationInModal(event: React.MouseEvent) {
    if (isModalOpened) {
      event.stopPropagation();
    }
  }

  return { isModalOpened, setIsModalOpened, toggleModal, stopPropagationInModal };
}
