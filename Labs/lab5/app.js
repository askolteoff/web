// ReactDOM.render(output, document.getElementById("myDiv"));
const data = {
    image: "img/bob.png",
    cardTitle: "Bob Dylan",
    cardDescription: "Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.",
    button: {
      url: "https://en.wikipedia.org/wiki/Bob_Dylan",
      label: "Go to wikipedia"
    }
};


ReactDOM.render(data.cardTitle,document.getElementById('card-title'));
ReactDOM.render(data.cardDescription,document.getElementById('card-text'));
ReactDOM.render(data.button.label,document.getElementById('button_one'));
ReactDOM.render(data.image,document.getElementsByTagName('src'));
ReactDOM.render(data.button.url,button_one.getElementsByTagName('href'));




