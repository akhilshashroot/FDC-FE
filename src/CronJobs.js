import React from 'react';
import boopSfx from './assets/sounds/newnotification.mp3';
import { performRequest } from './services/index';

class CronJobs extends React.Component {
    audio = new Audio();
    intervalID = 0;
    state = {
        tickets: ""
    }

    fileRef = React.createRef();

    componentDidMount() {
        sessionStorage.setItem("o_c", 0);
        this.audio.src = boopSfx;
        this.intervalID = setInterval(this.callTicketsOrderApi, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    ticketNotification = () => {
        var playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(_ => { })
                .catch(error => {
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tickets !== this.state.tickets) {
            if (prevState.tickets.length !== this.state.tickets.length) {
                setTimeout(this.ticketNotification, 1000);
            } else {
                if ((prevState.tickets && prevState.tickets.length) && (this.state.tickets && this.state.tickets.length)) {
                    let openTicketsID = []
                    prevState.tickets.forEach(val => {
                        if (val.ticket_id) {
                            openTicketsID.push(val.ticket_id)
                        }
                    });
                    this.state.tickets.forEach((tkt) => {
                        if (openTicketsID.includes(tkt.ticket_id)) {
                            return true
                        } else {
                            setTimeout(this.ticketNotification, 1000);
                        }
                    })
                    // let boolValue = this.state.tickets.every((tkt) => openTicketsID.includes(tkt.ticket_id));
                    // if (!boolValue) {
                    //     setTimeout(this.ticketNotification, 1000);
                    // }
                }

            }
        }
    }

    haveSameData = (obj1, obj2) => {
        const obj1Length = Object.keys(obj1).length;
        const obj2Length = Object.keys(obj2).length;

        if (obj1Length === obj2Length) {
            return Object.keys(obj1).every(
                key => obj2.hasOwnProperty(key)
                    && obj2[key] === obj1[key]);
        }
        return false;
    }

    callTicketsOrderApi = () => {
        const userName = sessionStorage.getItem("userName") || null;
        const orderCount = sessionStorage.getItem("o_c") || 0;
        const token_value = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_value}`
        };
        let url = `/api/ps/crm_status/${userName}/${orderCount}`;
        let settingUrl = `/api/ps/settings/${userName}`;
        performRequest('get', settingUrl, headers)
            .then(res => {
                if (res.status === 200 && res.data && res.data.response_code === 200) {
                    if (res.data.data && res.data.data.settings && res.data.data.settings.sound) {
                        performRequest('get', url, headers)
                            .then((response) => {
                                if (response.status === 200) {
                                    var tickets_arr = []
                                    var openTickets = []
                                    if (response.data.response_code === 200 && response.data && response.data.data) {

                                        if (response.data.data.ticket_list && response.data.data.ticket_list.length) {
                                            response.data.data.ticket_list.forEach((data) => {
                                                if (data.ticketcount) {
                                                    tickets_arr = [...tickets_arr, ...data.tickets]
                                                }
                                            })
                                        }
                                        if (tickets_arr && tickets_arr.length) {
                                            openTickets = tickets_arr.filter(ticket => ticket.ticket_status === "Open")
                                        }
                                        this.setState({ tickets: openTickets });

                                        sessionStorage.setItem("o_c", response.data.data.order_total);
                                    }

                                }
                            })
                    }
                }
            })
    }

    render() {
        return (
            <>
                <span id="myCheck" ref={this.fileRef} onClick={this.ticketNotification} ></span>
            </>
        )
    }
}

export default CronJobs