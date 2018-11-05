import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = {
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      margin: 10
    },
    bigAvatar: {
      width: 120,
      height: 120,
    },
    card:{
        width: 250,
        height: 75,
        padding: 5,
        margin: 5,
        display: "inline-block",
    },
  };

class Cookie extends Component{
    constructor(props){
        super(props);
        this.urlDict = [];
        this.urlDict["advice"]={url:"https://api.adviceslip.com/advice", key:"slip", key2:"advice", title:"random cat (https://aws.random.cat/)"};
        this.urlDict["chuck"]={url:"https://api.chucknorris.io/jokes/random", key:"value", title:"random cat (https://aws.random.cat/)"};

        this.state = {
            error:false,
            isLoaded:false,
            text:null,
            title:null,
        }
    }

    componentDidMount(){
        this.doRequestCookie();
    }

    doRequestCookie(){
        fetch(this.urlDict[this.props.type].url)
        .then(response=>response.json())
        .then((result)=>{
            var text ="";
            var key = this.urlDict[this.props.type].key;
            var key2 = this.urlDict[this.props.type].key2;
            if(key2){
                text = result[key][key2];
            }
            else{
                text = result[key];
            }
            this.setState({
                text: text,
                isLoaded: true,
                title: this.urlDict[this.props.type].title,
            });
        })
        .catch((error)=>{
            this.setState({
                error: true,
                isLoaded: true
            });                
        })
    }

    render(){
        const {error, isLoaded, text, title} = this.state;
        const {classes} = this.props;
        if(error)
        {
            return <div>Failed to load</div>
        }
        if(!isLoaded)
        {
            return(
                <Card className={classNames(classes.card)}>
                    <img src="./spinner.gif" alt="cookie"></img>
                </Card>
            )
        }
        return(
            <Card className={classNames(classes.card)} onClick={(event)=>this.doRequestCookie()}>
                <center>
                <Typography>{text}</Typography>
                </center>
            </Card>
        )
    };
}

Cookie.propTypes ={
    classes: PropTypes.object.isRequired,
    type: PropTypes.string
};

export default withStyles(styles) (Cookie);