import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
    const cancelButtonRef = useRef();
    return (
        <>
            <Transition show={modalOpen} as={Fragment} appear>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-30 overflow-y-auto text-center"
                    initialFocus={cancelButtonRef}
                    onClose={() => setModalOpen(false)}
                >
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="relative max-w-2xl w-screen rounded-xl p-8 text-white shadow-lg ">
                                {/* Close Button */}
                                <button
                                    onClick={() => setModalOpen(false)}
                                    type="button"
                                    className="absolute top-5 right-28 transitions w-10 h-10 flex items-center justify-center text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
                                    ref={cancelButtonRef}
                                >
                                    <IoClose size={24} />
                                </button>
                                {children}

                                
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default MainModal;
