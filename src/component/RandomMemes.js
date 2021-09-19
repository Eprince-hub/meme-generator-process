import { useEffect, useState } from 'react';

export default function RandomMemes() {
  // declare state variables
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bulkImageUrls, setBulkImageUrls] = useState([]);
  const [randomMemes, setRandomMemes] = useState(
    'https://api.memegen.link/images/pigeon/Engineer/_/Is_this_Photoshop~q.png?style=https://i.imgur.com/W0NXFpQ.png',
  );
  const [copied, handleCopied] = useState(false);
  const [randomMemesName, setRandomMemesName] = useState();

  // make the fetch request inside the UseEffect hook
  // so that the fetch will only start when the component have been loaded
  // The fetch call inside the useEffect will get an array of objects
  // containing the memes object that i need.

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((res) => res.json())
      .then(
        (fetchResult) => {
          setIsLoaded(true);
          setBulkImageUrls(fetchResult);

          // console.log(fetchResult);
        },
        (error) => {
          setIsLoaded(true);
          setErrors(error);
          // console.log(error);
        },
      );
  }, []);

  // This function call will select a random memes url from the array of all the
  // bulkImageUrls.example which contained an already made memes.
  function getRandomMemes() {
    const randomMemesUrl = [];
    bulkImageUrls.map((imageUrl) => {
      randomMemesUrl.push(imageUrl.example);
    });
    // console.log(randomMemesUrl);

    const randomNumber = Math.floor(Math.random() * randomMemesUrl.length);
    return randomMemesUrl[randomNumber];
  }

  // this function handles the change of the random meme
  // by triggering the getRandomMemes function on a button click.
  function handleRandomMemeChange() {
    setRandomMemes(getRandomMemes());
  }

  //	console.log(bulkImageUrls);

  console.log(randomMemes);

  // The function that handles copy the meme to clipboard by a button click that triggers it.
  function handleCopy() {
    navigator.clipboard.writeText(randomMemes);
    handleCopied(true);
    setTimeout(() => {
      handleCopied(false);
    }, 2000);
  }

  return (
    <div>
      <h1>Hello from RandomMemes!</h1>
      <img src={randomMemes} alt="Random Memes From The API" width="600px" />

      <button onClick={handleRandomMemeChange}>Choose Random Memes</button>

      <a href={randomMemes} download="Hemmmmme">
        <button>Download</button>
      </a>

      <button onClick={handleCopy}>
        {copied ? 'Meme Copied' : 'Copy Meme'}
      </button>
    </div>
  );
}

// export default function MyComponent() {
//   const [errors, setErrors] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [bulkImageArray, setBulkImageArray] = useState([]);
//   // const [counter, setCounter] = useState(1);
//   // const [imageUrls, setImageUrls] = useState();
//   // const [imagesNames, setImagesNames] = useState();
//   // const [imageId, setImageId] = useState();

//   const [selectedImage, setSelectedImage] = useState();

//   // using the usEffect hook to make the fetch request
//   // only when the component have been loaded
//   useEffect(() => {
//     fetch('https://api.memegen.link/templates')
//       .then((res) => res.json())
//       .then(
//         (fetchResults) => {
//           setIsLoaded(true);
//           setBulkImageArray(fetchResults);
//           // setImagesNames(fetchResults.map((element) => element.name));
//         },
//         (error) => {
//           setIsLoaded(true);
//           setErrors(error);
//         },
//       );
//   }, []);

//   console.log(bulkImageArray);
//   // This is the function that should get me access to the object id value when any value is selected.
//   function handleChange(event) {
//     console.log('You just selected: ' + event.target.value);
//     // setImagesNames(event.target.value);
//     setSelectedImage(event.target.value);
//   }

//   console.log('User choosed: ' + selectedImage);

//   // const baseURL = 'https://api.memegen.link/images/';

//   // eslint-disable-next-line
//   if (errors) {
//     return <div>Error: {errors.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div>
//         <select onChange={handleChange}>
//           {bulkImageArray.map((item) => (
//             <option value={item.id} key={item.id}>
//               {/* {item.id} */}
//               {item.name}
//             </option>
//           ))}
//         </select>
//         {/* <img src={(baseURL += selectedImage)} alt={imagesNames} /> */}
//       </div>
//     );
//   }
// }
