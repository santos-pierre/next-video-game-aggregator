import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { createPortal } from 'react-dom';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

type ModalProps = {
    show: boolean;
    onClose: (value: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ show, onClose: handleVisibility, children }) => {
    const [isDocument, setIsDocument] = useState<boolean>(false);

    useEffect(() => {
        setIsDocument(true);
    }, []);

    if (isDocument) {
        const container: Element | null = document.getElementById('app-modal');
        if (container) {
            return createPortal(
                <Transition.Root show={show} as={Fragment}>
                    <Dialog
                        as="div"
                        static={false}
                        className="fixed z-50 inset-0 overflow-y-auto"
                        open={show}
                        onClose={handleVisibility}
                    >
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
                            </Transition.Child>
                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block bg-gray-800 rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:p-6 align-bottom sm:align-middle">
                                    {children}
                                    <button
                                        type="button"
                                        className="fixed -top-6 -right-6 inline-flex justify-center rounded-md border border-transparent text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={() => handleVisibility(false)}
                                    >
                                        <XIcon className="w-6" />
                                    </button>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>,
                container
            );
        } else {
            return null;
        }
    }

    return null;
};

export default Modal;
