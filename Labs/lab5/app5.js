

const BootstrapCard = props => {
  return (
    <div className="card m-5">
      <img className="card-img-top" src={props.imageUrl} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href={props.buttonUrl} className="btn btn-primary">
          {props.buttonLabel}
        </a>
      </div>
    </div>
  );
};

BootstrapCard.propTypes = {
  title: PropType.string,
  imageUrl: PropType.string,
  description: PropType.string,
  buttonUrl: PropType.string,
  buttonLabel: PropType.string
};

const Hero = props => {
  return (
    <div className="container m-5">
      <h1 className="display-4">{props.title}</h1>
      <p className="lead">{props.description}</p>
      <a className="btn btn-primary btn-lg" href={props.buttonURL} role="button">
        {props.buttonLabel}
      </a>
    </div>
  );
};

Hero.propTypes = {
  title: PropType.string,
  description: PropType.string,
  buttonLabel: PropType.string,
  buttonURL: PropType.string
};

ReactDOM.render(
  <div>
    <BootstrapCard
      title="Bob Dylan"
      imageUrl="img/Dylan.png?raw=true"
      description="Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer-songwriter."
      buttonUrl="https://en.wikipedia.org/wiki/Bob_Dylan"
      buttonLabel="Go to wikipedia"
    />
    <Hero
      title="Welcome to react"
      description="React is the most popular rendering library in the world"
      buttonLabel="Go to the official website"
      buttonURL="https://reactjs.org/"
    />
  </div>,
  document.getElementById("myDiv")
);