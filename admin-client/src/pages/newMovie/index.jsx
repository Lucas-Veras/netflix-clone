import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../context/movieContext/apiCall";
import { MovieContext } from "../../context/movieContext/movieContext";
import storage from "../../services/firebase";
import { useToggle } from "../../hooks/useToggle";
import Loading from "../../components/Loading";
import "./styles.css";

export default function NewMovie() {
  const [movie, setMovie] = useState();
  const [img, setImg] = useState();
  const [imgTitle, setImgTitle] = useState();
  const [imgSm, setImgSm] = useState();
  const [trailer, setTrailer] = useState();
  const [video, setVideo] = useState();
  const [uploaded, setUploaded] = useState(0);
  const [qtyFiles, setQtyFiles] = useState(0);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState([]);

  const {
    setFalse: setFalseImg,
    setTrue: setTrueImg,
    value: valueImg,
  } = useToggle();
  const {
    setFalse: setFalseImgTitle,
    setTrue: setTrueImgTitle,
    value: valueImgTitle,
  } = useToggle();
  const {
    setFalse: setFalseImgSm,
    setTrue: setTrueImgSm,
    value: valueImgSm,
  } = useToggle();
  const {
    setFalse: setFalseTrailer,
    setTrue: setTrueTrailer,
    value: valueTrailer,
  } = useToggle();
  const {
    setFalse: setFalseVideo,
    setTrue: setTrueVideo,
    value: valueVideo,
  } = useToggle();
  const {
    setFalse: setEnabled,
    setTrue: setDisabled,
    value: disabled,
  } = useToggle();
  const { setTrue: changeToAnotherPage, value: goToAnotherPageValue } =
    useToggle();

  const { dispatch } = useContext(MovieContext);

  const Navigate = useNavigate();

  const handleChangeToAnotherPage = (e) => {
    e.preventDefault();
    changeToAnotherPage();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = async (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;

      const storageRef = ref(storage, `/items/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => ({ ...prev, [item.label]: downloadURL }));
            setUploaded((prev) => prev + 1);
            setProgress(0);
            setUploadComplete((prev) => [
              ...prev,
              `${item.label}: ${item.file.name} uploaded`,
            ]);
          });
        },
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setDisabled();
    setError("");
    if (!img || !imgTitle || !imgSm || !trailer || !video) {
      setError("Please fill all the fields");
      setEnabled();
      return;
    }
    let arrayToUpload = [];
    const items = [
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ];

    items.forEach((item) => {
      if (typeof item.file !== "string") {
        arrayToUpload.push(item);
      } else {
        setMovie((prev) => ({ ...prev, [item.label]: item.file }));
      }
    });
    upload(arrayToUpload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setDisabled();
    if (
      !!!movie?.title ||
      !!!movie?.desc ||
      !!!movie?.genre ||
      !!!movie?.year ||
      !!!movie?.limit ||
      !!!movie?.isSeries
    ) {
      setError("Please fill all the fields");
      setEnabled();
      return;
    }
    if (
      isNaN(parseInt(movie.year.trim())) ||
      parseInt(movie.year.trim()).toString().length !== 4
    ) {
      setError("Please enter a valid number for year");
      setEnabled();
      return;
    }
    createMovie(movie, dispatch).then(() => {
      setEnabled();
      Navigate("/movies");
    });
  };
  console.log(movie);
  console.log(typeof Number(movie?.limit));
  useEffect(() => {
    if (valueImg) setQtyFiles((prev) => prev - 1);
    else setQtyFiles((prev) => prev + 1);
  }, [valueImg]);

  useEffect(() => {
    if (valueImgTitle) setQtyFiles((prev) => prev - 1);
    else setQtyFiles((prev) => prev + 1);
  }, [valueImgTitle]);

  useEffect(() => {
    if (valueImgSm) setQtyFiles((prev) => prev - 1);
    else setQtyFiles((prev) => prev + 1);
  }, [valueImgSm]);

  useEffect(() => {
    if (valueTrailer) setQtyFiles((prev) => prev - 1);
    else setQtyFiles((prev) => prev + 1);
  }, [valueTrailer]);

  useEffect(() => {
    if (valueVideo) setQtyFiles((prev) => prev - 1);
    else setQtyFiles((prev) => prev + 1);
  }, [valueVideo]);
  console.log(
    !!movie?.title,
    !!movie?.desc,
    !!movie?.genre,
    !!movie?.year,
    !!movie?.limit,
    !!movie?.isSeries,
  );
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      {!goToAnotherPageValue ? (
        <>
          <p>Step 1 of 2</p>
          <progress value={progress} style={{ marginRight: 10 }} />
          <span>{(progress * 100).toFixed(0)}%</span>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <label>
                <input
                  type="radio"
                  name="imgRadio"
                  onChange={setFalseImg}
                  checked={!valueImg}
                />{" "}
                File
              </label>
              <label>
                <input type="radio" name="imgRadio" onChange={setTrueImg} />{" "}
                Link
              </label>
              {valueImg ? (
                <input
                  type="text"
                  placeholder="Image"
                  name="img"
                  onChange={(e) => setImg(e.target.value)}
                />
              ) : (
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={(e) => setImg(e.target.files[0])}
                  accept="image/*"
                />
              )}
            </div>
            <div className="addProductItem">
              <label>Title image</label>
              <label>
                <input
                  type="radio"
                  name="imgTitleRadio"
                  onChange={setFalseImgTitle}
                  checked={!valueImgTitle}
                />{" "}
                File
              </label>
              <label>
                <input
                  type="radio"
                  name="imgTitleRadio"
                  onChange={setTrueImgTitle}
                />{" "}
                Link
              </label>
              {valueImgTitle ? (
                <input
                  type="text"
                  placeholder="Title image"
                  name="imgTitle"
                  onChange={(e) => setImgTitle(e.target.value)}
                />
              ) : (
                <input
                  type="file"
                  id="imgTitle"
                  name="imgTitle"
                  onChange={(e) => setImgTitle(e.target.files[0])}
                  accept="image/*"
                />
              )}
            </div>
            <div className="addProductItem">
              <label>Thumbnail image</label>
              <label>
                <input
                  type="radio"
                  name="imgSmRadio"
                  onChange={setFalseImgSm}
                  checked={!valueImgSm}
                />{" "}
                File
              </label>
              <label>
                <input type="radio" name="imgSmRadio" onChange={setTrueImgSm} />{" "}
                Link
              </label>
              {valueImgSm ? (
                <input
                  type="text"
                  placeholder="Thumbnail image"
                  name="imgSm"
                  onChange={(e) => setImgSm(e.target.value)}
                />
              ) : (
                <input
                  type="file"
                  id="imgSm"
                  name="imgSm"
                  onChange={(e) => setImgSm(e.target.files[0])}
                  accept="image/*"
                />
              )}
            </div>
            <div className="addProductItem">
              <label>Trailer</label>
              <label>
                <input
                  type="radio"
                  name="trailerRadio"
                  onChange={setFalseTrailer}
                  checked={!valueTrailer}
                />{" "}
                File
              </label>
              <label>
                <input
                  type="radio"
                  name="trailerRadio"
                  onChange={setTrueTrailer}
                />{" "}
                Link
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
                  onChange={(e) => setTrailer(e.target.files[0])}
                  accept="video/*"
                />
              )}
            </div>
            <div className="addProductItem">
              <label>Video</label>
              <label>
                <input
                  type="radio"
                  name="videoRadio"
                  onChange={setFalseVideo}
                  checked={!valueVideo}
                />{" "}
                File
              </label>
              <label>
                <input type="radio" name="videoRadio" onChange={setTrueVideo} />{" "}
                Link
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
                  onChange={(e) => setVideo(e.target.files[0])}
                  accept="video/*"
                />
              )}
            </div>
            <div
              className="addProductItem"
              style={{ textAlign: "center", alignItems: "center" }}
            >
              {error && <span style={{ color: "red" }}>{error}</span>}
              {uploaded === qtyFiles ? (
                <>
                  <button
                    className="addProductButton"
                    onClick={(e) => handleChangeToAnotherPage(e)}
                  >
                    Continue
                  </button>
                </>
              ) : (
                <button
                  className="addProductButton"
                  onClick={handleUpload}
                  disabled={disabled}
                >
                  {disabled ? (
                    <>
                      <progress value={progress} />{" "}
                      <span>{(progress * 100).toFixed(0)}%</span>{" "}
                      <Loading width="15px" />
                    </>
                  ) : (
                    <> Upload the files</>
                  )}
                </button>
              )}
              {disabled &&
                uploadComplete.map((item, index) => <p key={index}>{item}</p>)}
            </div>
          </form>
        </>
      ) : (
        <>
          <p>Step 2 of 2</p>
          <form className="addProductForm">
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
              <select
                name="limit"
                id="limit"
                defaultValue=""
                onChange={handleChange}
                value={movie?.limit}
              >
                <option value="" disabled>
                  Choose
                </option>
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Is Series?</label>
              <select
                name="isSeries"
                id="isSeries"
                defaultValue=""
                onChange={handleChange}
                value={movie?.isSeries}
              >
                <option value="" disabled>
                  Choose
                </option>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div
              className="addProductItem"
              style={{ textAlign: "center", alignItems: "center" }}
            >
              {error && <span style={{ color: "red" }}>{error}</span>}
              <button className="addProductButton" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
