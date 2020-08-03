import React, { Component } from "react";
import Avatar from 'react-avatar-edit'


class ImageUpload extends Component {

    constructor(props) {
        super(props)
        const src = ""
        this.state = {
          preview: null,
          src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
      }
      
      onClose() {
        this.setState({preview: null})
      }
      
      onCrop(preview) {
        this.setState({preview})
      }
      render() {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <Avatar
                    width={120}
                    height={120}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    src={this.state.src}
                    />
                <div>
                    <img src={this.state.preview} />
                </div>
                    
            </div>
      )
    }
  
}


export default ImageUpload;