import React, { useState } from "react";
import dynamic from "next/dynamic";

export default function SignupHorizontal({ posts = [], showTitle = true }) {
    
    const [registered, setRegistered] = useState(false) 
    const [error, setError] = useState(false) 
    
  return (
    <>
      {<div className={`rounded-md mb-12 lg:mb-0`}
          style={{ background: '#141929' }}>
          {registered == false ?
              <>
                  {this.props.text !== false &&
                      <>
                          <h2 className={` ${this.props.layout == 'horizontal' ? ' text-base text-gray-800' : this.props.headerStyle ? this.props.headerStyle : " text-sm text-white"}  font-semibold mb-2`}>{this.props.title ? this.props.title : 'Design tools weekly 💎'}</h2>

                          <div className={`block text-sm mb-1 leading-5 font-base ${this.props.layout == 'horizontal' ? 'text-gray-800 mb-3 ' : this.props.descriptionStyle ? this.props.descriptionStyle : "text-gray-200"}`}>
                              {this.props.layout == 'horizontal' ? 'Get the latest stories and tools once a week.' : this.props.description ? this.props.description : "Get trending design tools delivered once a week."}
                          </div>
                      </>}
                  <HookForm align={this.props.align} onSubmit={this.onSubmit} buttonStyle={this.props.buttonStyle} buttonText={this.state.buttonText} layout={this.props.layout} />
              </> : this.state.error ?
                  <>
                      <h2 className={`text-base ${this.props.layout == 'horizontal' ? 'text-gray-800' : "text-white"} font-semibold mb-2`}>{this.props.title ? this.props.title : "Please try again!"} &nbsp; <div className="inline -mt-1">🤖</div></h2>
                      <div className={`block text-sm mb-1 leading-5 font-base ${this.props.layout == 'horizontal' ? 'text-gray-800' : "text-white"}`}>
                          Something went wrong. Please refresh the page and try again. Contact hello@prototypr.io for help.
            </div>
                  </> :
                  <>
                      <h2 className={`text-base ${this.props.layout == 'horizontal' ? 'text-gray-800' : "text-white"} font-semibold mb-2`}>{this.props.title ? this.props.title : "You're In!"} &nbsp; <div className="inline -mt-1">🙌</div></h2>
                      <div className={`block text-sm mb-1 leading-5 font-base ${this.props.layout == 'horizontal' ? 'text-gray-800' : "text-white"}`}>
                          You're in! Thanks for joining 💌
              </div>
                  </>
          }
      </div>
          :
          <HookForm registered={this.state.registered} onSubmit={this.onSubmit} buttonStyle={this.props.buttonStyle} buttonText={this.state.buttonText} layout={this.props.layout} />
      }
  </>
  );
}
