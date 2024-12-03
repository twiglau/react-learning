const random = [
  "React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.",
  "Whether you work on your own or with thousands of other developers, using React feels the same.",
  "React components are JavaScript functions. Want to show some content conditionally? Use an if statement. Displaying a list? Try array map(). Learning React is learning programming.",
  "This markup syntax is called JSX. It is a JavaScript syntax extension popularized by React. ",
  "You don’t have to build your whole page in React. Add React to your existing HTML page, and render interactive React components anywhere on it.",
];

var myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
  data: "hex",
};

const url = "https://echo.apifox.com/delay/1";

export const likeApi = async (message) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(message);
      } else {
        reject(message);
      }
    }, 1000);
  });
  return message;
};
export const getMessage2 = async (message) => {
  await fetch(url, requestOptions);
  return message;
};
export const getMessage = async () => {
  await fetch(url, requestOptions);
  const i = Math.floor(Math.random() * 10) % 5;
  return {
    value: random[i],
    id: getUuid(),
  };
};

function getUuid() {
  var s = [];
  var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 16; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[8] = "-";
  let uuid = s.join("");
  return uuid;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export const fetchList = async () => {
  const res = await fetch(fakeDataUrl);
  return res.json();
};

export const fetchListWithCancel = (number) => {
  let controller = new AbortController();
  let signal = controller.signal;

  const promise = new Promise((resolve) => {
    fetch(
      `https://randomuser.me/api/?results=${number}&inc=name,gender,email,nat,picture&noinfo`,
      { signal }
    )
      .then((res) => {
        resolve(res.json());
      })
      .catch(() => {
        console.log("接口成功取消!");
      });
  });

  promise.cancel = () => {
    if (controller) {
      controller.abort();
    }
  };

  return promise;
};
