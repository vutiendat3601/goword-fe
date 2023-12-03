import classNames from 'classnames/bind';
import Modal from '../../../components/modal/Modal';
import TextField from '../../../components/text-field/TextField';
import styles from './NewPlan.module.css';
import { useEffect, useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { FormField, emptyFormField } from '../../../utils/form-field';
import { validateName } from './new-plan-validator';
import Button from '../../../components/button/Button';
import { hasNotNull } from '../../../utils/validator';

const css = classNames.bind(styles);

function NewPlan() {
  const [name, setName] = useState<FormField>(emptyFormField);
  const [description, setDescription] = useState<FormField>(emptyFormField);
  const [thumbFile, setThumbFile] = useState<any>();
  const [valid, setValid] = useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const valid = !hasNotNull(name.message);
    setValid(valid);
  }, [name]);

  useEffect(() => {
    return () => {
      thumbFile && URL.revokeObjectURL(thumbFile.preview);
    };
  }, [thumbFile]);

  return (
    <Modal title="Tạo kế hoạch">
      <Form
        ref={formRef}
        method="post"
        className={`${css('wrapper')}`}
        encType="multipart/form-data"
        onSubmit={
          hasNotNull(name.message)
            ? () => (e: any) => e?.preventDefault()
            : undefined
        }
      >
        <div className={`${css('thumb')}`}>
          <img
            title="Nhấn để đổi ảnh"
            className={`${css('thumb-preview')}`}
            alt="Chưa chọn ảnh, nhấn vào đây để chọn."
            src={thumbFile?.preview}
            onClick={(e) => fileRef.current?.click()}
          />
          {/* <p className={css('action-title')}>Nhấn để chọn ảnh</p> */}
          <input
            name="thumb"
            type="file"
            ref={fileRef}
            className={css('file')}
            accept="image/png, image/gif, image/jpeg"
            onChange={(e: any) => {
              const file: any = e?.target?.files[0];
              if (file) {
                file.preview = URL.createObjectURL(file);
                setThumbFile(file);
              }
            }}
          />
        </div>
        <div className={`form-group`}>
          <p className={`form-message`}>{name.message}</p>
          <div className={`form-input`}>
            <TextField
              name="name"
              placeholder="Tên *"
              value={name.value}
              onChange={(value: string) => {
                const nameMsg = validateName(value);
                setName({ value, message: nameMsg });
              }}
            />
          </div>
        </div>
        <div className={`form-group`}>
          <p className={`form-message`}></p>
          <TextField
            name="description"
            className={`${css('desc-box')}`}
            type="textarea"
            rows={6}
            placeholder="Mô tả"
            value={description.value}
            onChange={(value: string) =>
              setDescription({ ...description, value })
            }
          />
        </div>
        <div className={`${css('action')}`}>
          <button
            className="btn btn--white"
            onClick={() => navigate(-1)}
            type="button"
          >
            Hủy
          </button>
          <Button disabled={!valid} type={valid ? 'submit' : 'button'}>
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewPlan;
