export class UserInfo {
    constructor({ name, info}, api) {
        this.name = document.querySelector(`.${name}`)
        this.info = document.querySelector(`.${info}`)
        this.api = api
    }

    getUserInfo() {
        return this.api.getUserProfile()
    }

    setUserInfo({name, info}) {
        return this._api.saveProfileData(name, info)
            .then(r => {
                this.name.textContent = r.name
                this.info.textContent = r.info
            })
    }
}