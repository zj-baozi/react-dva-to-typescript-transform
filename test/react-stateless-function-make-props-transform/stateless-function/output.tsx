type HelloPropsType = {
  message?: string;
};
const Hello: React.SFC<HelloPropsType> = ({ message }) => {
  return <div>hello {message}</div>;
};
Hello.propTypes = {
  message: React.PropTypes.string
};
