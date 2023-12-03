import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import TextField from '../../../components/text-field/TextField';
import { FormField, emptyFormField } from '../../../utils/form-field';
import styles from './NewExercise.module.css';
import { hasNotNull } from '../../../utils/validator';
import { validateName } from './new-exercise-validator';

const css = classNames.bind(styles);

function NewExercise(): JSX.Element {
  const [name, setName] = useState<FormField>(emptyFormField);
  const [content, setContent] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<any>();
  const [valid, setValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const valid = !hasNotNull(name.message);
    setValid(valid);
  }, [name]);

  useEffect(() => {
    return () => {
      avatarFile && URL.revokeObjectURL(avatarFile.preview);
    };
  }, [avatarFile]);

  return (
    <Form
      method="post"
      className={`${css('wrapper')}`}
      encType="multipart/form-data"
    >
      <div className={`${css('thumb')}`}>
        <img
          title="Nhấn để đổi ảnh"
          className={`${css('thumb-preview')}`}
          alt="Chưa chọn ảnh, nhấn vào đây để chọn."
          src={avatarFile?.preview}
          onClick={(e) => fileRef.current?.click()}
        />
        {/* <p className={css('action-title')}>Nhấn để chọn ảnh</p> */}
        <input
          ref={fileRef}
          name="thumb"
          type="file"
          className={css('file')}
          accept="image/png, image/gif, image/jpeg"
          onChange={(e: any) => {
            const file: any = e?.target?.files[0];
            if (file) {
              file.preview = URL.createObjectURL(file);
              setAvatarFile(file);
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
      <div className={`${css('content')} form-group`}>
        {/* <p className={`form-message`}></p> */}
        {/* <TextField
            name="description"
            className={`${css('desc-box')}`}
            type="textarea"
            rows={6}
            placeholder="Nội dung"
          /> */}
        <input
          name="content"
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          hidden
        />
        <ReactQuill
          className={css('content-editor')}
          theme="snow"
          value={content}
          onChange={setContent}
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
  );
}

export default NewExercise;
