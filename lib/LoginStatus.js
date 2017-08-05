class LoginStatus {
    constructor(store) {
        this.store = store
    }

    readCookie(cookiename) {
        // Get name followed by anything except a semicolon
        var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
        // Return everything after the equal sign, or an empty string if the cookie name not found
        return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
    }

    decode() {
        const theComponent = this.store
        if(this.readCookie('jwt')) {
            const jwt = JSON.stringify({'jwt': this.readCookie('jwt')})
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/apis/user/decode',
                contentType: 'application/json',
                data: jwt,
                success: function (res) {
                    theComponent.commit('setUser', res)
                    console.log(res)
                }
            })
        }
    }

}

export default LoginStatus