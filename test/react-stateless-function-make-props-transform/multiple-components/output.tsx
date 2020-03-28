type HelloPropsType = {
  message?: string;
};
const Hello: React.SFC<HelloPropsType> = ({ message }) => {
  return <div>hello {message}</div>;
};
type HeyPropsType = {
  name: string;
};
const Hey: React.SFC<HeyPropsType> = ({ name }) => {
  return <div>hey, {name}</div>;
};
Hey.propTypes = {
  name: React.PropTypes.string.isRequired
};
Hello.propTypes = {
  message: React.PropTypes.string
};
