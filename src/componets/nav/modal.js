
import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Form } from 'reactstrap';

const ModalFocusAfterClose = (props) => {
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);

    const toggle = () => setOpen(!open);
    const handleSelectChange = ({ target: { value } }) => {
        setFocusAfterClose(JSON.parse(value));
    }

    return (
        <div>
            <Form inline onSubmit={(e) => e.preventDefault()}>
                <FormGroup>
                </FormGroup>
                <Button color="danger" onClick={toggle}>Open</Button>
            </Form>
            <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
                <ModalBody>
                    Observe the "Open" button. It will be focused after close when "returnFocusAfterClose" is true and will not be focused if "returnFocusAfterClose" is false.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Search</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ModalFocusAfterClose;
