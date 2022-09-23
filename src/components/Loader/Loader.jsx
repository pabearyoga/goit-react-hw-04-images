import { Watch } from 'react-loader-spinner';

export const Loader = () => {
  return (
<Watch
  height="80"
  width="80"
  radius="48"
  color="#4169e1"
  ariaLabel="watch-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 200,
      }}
    />
  );
};
