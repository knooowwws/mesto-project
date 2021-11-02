

export class UserInfo {
    constructor({ name, info, avatar }, getUserData, api) {
        this.name = document.querySelector(`.${name}`)
        this.info = document.querySelector(`.${info}`)
        this.info = document.querySelector(`.${avatar}`)
        this.obj = {
            name: this.name.textContent,
            info: this.info.textContent
        }
    }

    getUserInfo(){
        return getUserData
    }

    setUserInfo({name, info}) {
        return this._api.saveProfileData(name, info)
            .then(r => {
                this.name = r.name
                this.info = r.info
            })
    }
}