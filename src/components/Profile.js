import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, setProfile } from '@sspa/main'

import api from "../utils/api";
import '../blocks/profile/profile.css'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function Profile () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const dispatch = useDispatch()

  const currentUser = useSelector(getProfile)
  const imageStyle = { backgroundImage: `url(${ currentUser.avatar })` };

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        dispatch(setProfile(res))
      })
      .catch(console.error);
  }, []);

  function handleUpdateUserInfo (userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        dispatch(setProfile(newUserData));
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar (avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        dispatch(setProfile(newUserData));
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatar () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfile () {
    setIsEditProfilePopupOpen(true)
  }

  function closePopups () {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
  }

  return (
    <>
      <section className="profile page__section">
        <div className="profile__image" onClick={ handleEditAvatar } style={ imageStyle }></div>
        <div className="profile__info">
          <h1 className="profile__title">{ currentUser.name }</h1>
          <button className="profile__edit-button" type="button" onClick={ handleEditProfile }></button>
          <p className="profile__description">{ currentUser.about }</p>
        </div>
      </section>
      <EditProfilePopup
        isOpen={ isEditProfilePopupOpen } onClose={ closePopups } onUpdateUser={ handleUpdateUserInfo }
      />
      {/*https://play-lh.googleusercontent.com/jA5PwYqtmoFS7StajBe2EawN4C8WDdltO68JcsrvYKSuhjcTap5QMETkloXSq5soqRBqFjuTAhh28AYrA6A=w240-h480-rw*/}
      {/*https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250*/}
      <EditAvatarPopup
        isOpen={ isEditAvatarPopupOpen } onClose={ closePopups } onUpdateAvatar={ handleUpdateAvatar }
      />
    </>

  )
}

export default Profile