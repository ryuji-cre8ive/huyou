import { Button, TextField } from '@mui/material';

const FileInput = ({ onChange, selectedFile }: any) => {
  console.log(selectedFile?.name)
  return (
    <>
      <input
        accept='image/*'
        style={{ display: 'none' }}
        id='raised-button-file'
        type='file'
        onChange={onChange}
      />
      <label htmlFor='raised-button-file'>
        <Button variant='contained' component='span'>
          Upload
        </Button>
      </label>
      <TextField
        style={{ marginLeft: 16 }}
        variant='outlined'
        size='small'
        disabled
        value={selectedFile?.name ?? ''}
      />
    </>
  );
};

export default FileInput