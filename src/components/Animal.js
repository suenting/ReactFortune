import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
        width: 150,
        padding: 5,
        margin: 5,
        display: "inline-block",
    },
  };

class Animal extends Component{
    constructor(props){
        super(props);
        this.urlDict = [];
        this.urlDict["cat"]={url:"https://aws.random.cat/meow", key:"file", title:"random cat (https://aws.random.cat/)"};
        this.urlDict["dog"]={url:"https://dog.ceo/api/breeds/image/random", key:"message", title:"random dog (https://dog.ceo/api/)"};
        this.urlDict["dog2"]={url:"https://random.dog/woof.json", key:"url", title:"random dog (https://random.dog/)"};
        // no coors...
        //this.urlDict["fox"]={url:"https://randomfox.ca/floof/", key:"image"};

        this.state = {
            error:false,
            isLoaded:false,
            image:null,
            title:null,
        }
    }

    componentDidMount(){
        this.doRequestAnimal();
    }

    doRequestAnimal(){
        fetch(this.urlDict[this.props.type].url)
        .then(response=>response.json())
        .then((result)=>{
            this.setState({
                image: result[this.urlDict[this.props.type].key],
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
        const {error, isLoaded, image, title} = this.state;
        const {classes} = this.props;
        if(error)
        {
            return(<Card className={classNames(classes.card)} onClick={(event)=>this.doRequestAnimal()}>
                <center>
                <Typography>Failed to Load</Typography>
                </center>
            </Card>);
        }
        if(!isLoaded)
        {
            return(
            <Card className={classNames(classes.card)}>
            <center>
            <img src="./spinner.gif" alt="animal"></img>
            </center>
            </Card>                
            );
        }
        return(
            <Card className={classNames(classes.card)} onClick={(event)=>this.doRequestAnimal()}>
                <center>
                <Avatar
                    alt="animal"
                    src={image}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                />
                <Typography>{title}</Typography>
                </center>
            </Card>
        )
    };
}

Animal.propTypes ={
    classes: PropTypes.object.isRequired,
    type: PropTypes.string
};

export default withStyles(styles) (Animal);