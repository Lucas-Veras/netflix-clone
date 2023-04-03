import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../context/movieContext/apiCall";
import { MovieContext } from "../../context/movieContext/movieContext";
import storage from "../../services/firebase";
import { useToggle } from "../../hooks/useToggle";
import "./styles.css";

export default function NewMovie() {
  const [movie, setMovie] = useState()
  const [img, setImg] = useState()
  const [imgTitle, setImgTitle] = useState()
  const [imgSm, setImgSm] = useState()
  const [trailer, setTrailer] = useState()
  const [video, setVideo] = useState()
  const [uploaded, setUploaded] = useState(0)
  const [error, setError] = useState("")
  console.log(img)

  const { setFalse: setFalseImg, setTrue: setTrueImg, value: valueImg } = useToggle()
  const { setFalse: setFalseImgTitle, setTrue: setTrueImgTitle, value: valueImgTitle } = useToggle()
  const { setFalse: setFalseImgSm, setTrue: setTrueImgSm, value: valueImgSm } = useToggle()
  const { setFalse: setFalseTrailer, setTrue: setTrueTrailer, value: valueTrailer } = useToggle()
  const { setFalse: setFalseVideo, setTrue: setTrueVideo, value: valueVideo } = useToggle()
  const { setFalse: setDisable, setTrue: setEnable, value: disabled } = useToggle()

  const { dispatch } = useContext(MovieContext)

  const Navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value
    setMovie({ ...movie, [e.target.name]: value })
  }

  const upload = (items) => {
    items.forEach(item => {
      const fileName = new Date().getTime() + item.label + item.file.name

      const storageRef = ref(storage, `/items/${fileName}`)

      const uploadTask = uploadBytesResumable(storageRef, item.file)

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (err) => console.log(err), () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setMovie(prev => ({ ...prev, [item.label]: downloadURL }))
          setUploaded(prev => prev + 1)
        });
      })
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!movie || !img || !imgTitle || !imgSm || !trailer || !video) {
      setError("Please fill all the fields")
      return
    }
    let arrayToUpload = []

    if (typeof img !== "string") {
      arrayToUpload.push({ file: img, label: "img" })
    } else {
      setMovie(prev => ({ ...prev, img }))
    }

    if (typeof imgTitle !== "string") {
      arrayToUpload.push({ file: imgTitle, label: "imgTitle" })
    }

    if (typeof imgSm !== "string") {
      arrayToUpload.push({ file: imgSm, label: "imgSm" })
    }

    if (typeof trailer !== "string") {
      arrayToUpload.push({ file: trailer, label: "trailer" })
    }

    if (typeof video !== "string") {
      arrayToUpload.push({ file: video, label: "video" })
    }

    if (arrayToUpload.length !== 0) {
      upload(arrayToUpload)
    }

    createMovie(movie, dispatch, Navigate)
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <label>
            <input type="radio" name="imgRadio" onChange={setFalseImg} checked={!valueImg} /> File
          </label>
          <label>
            <input type="radio" name="imgRadio" onChange={setTrueImg} /> Link
          </label>
          {valueImg ? (
            <input
              type="text"
              placeholder="Image"
              name="img"
              onChange={e => setImg(e.target.value)}
            />
          ) : (
            <input
              type="file"
              id="img"
              name="img"
              onChange={e => setImg(e.target.files[0])}
              accept="image/*"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <label>
            <input type="radio" name="imgTitleRadio" onChange={setFalseImgTitle} checked={!valueImgTitle} /> File
          </label>
          <label>
            <input type="radio" name="imgTitleRadio" onChange={setTrueImgTitle} /> Link
          </label>
          {valueImgTitle ? (
            <input
              type="text"
              placeholder="Title image"
              name="imgTitle"
              onChange={e => setImgTitle(e.target.value)}
            />
          ) : (
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              onChange={e => setImgTitle(e.target.files[0])}
              accept="image/*"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <label>
            <input type="radio" name="imgSmRadio" onChange={setFalseImgSm} checked={!valueImgSm} /> File
          </label>
          <label>
            <input type="radio" name="imgSmRadio" onChange={setTrueImgSm} /> Link
          </label>
          {valueImgSm ? (
            <input
              type="text"
              placeholder="Thumbnail image"
              name="imgSm"
              onChange={e => setImgSm(e.target.value)}
            />
          ) : (
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={e => setImgSm(e.target.files[0])}
              accept="image/*"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Jonh Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        {/**     <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div> 
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>*/}
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <label>
            <input type="radio" name="trailerRadio" onChange={setFalseTrailer} checked={!valueTrailer} /> File
          </label>
          <label>
            <input type="radio" name="trailerRadio" onChange={setTrueTrailer} /> Link
          </label>
          {valueTrailer ? (
            <input
              type="text"
              placeholder="Trailer"
              name="trailer"
              onChange={handleChange}
            />
          ) : (
            <input
              type="file"
              name="trailer"
              onChange={e => setTrailer(e.target.files[0])}
              accept="video/*"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <label>
            <input type="radio" name="videoRadio" onChange={setFalseVideo} checked={!valueVideo} /> File
          </label>
          <label>
            <input type="radio" name="videoRadio" onChange={setTrueVideo} /> Link
          </label>
          {valueVideo ? (
            <input
              type="text"
              placeholder="Video"
              name="video"
              onChange={handleChange}
            />
          ) : (
            <input
              type="file"
              name="video"
              onChange={e => setVideo(e.target.files[0])}
              accept="video/*"
            />
          )}
        </div>
        <div className="addProductItem" style={{ textAlign: "center", alignItems: "center" }}>
          {error && <span style={{ color: "red" }}>{error}</span>}
          <button
            className="addProductButton"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
