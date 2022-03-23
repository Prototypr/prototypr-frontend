import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import axios from "axios";
import jsCookie from 'js-cookie';
import dynamic from 'next/dynamic'

const CommentForm = dynamic(() => import('./CommentForm'), { ssr: false })
const CommentItem = dynamic(() => import('./CommentItem'), { ssr: false })

export default function CommentBox({ titleClass = "", withAuthUser = {}, setUserAuthenticated = () => {}, post = {}, item }) {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [editorState, setEditorState] = useState("");
    const [originalComments, setOriginalComments] = useState([]);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    const unflatten = (arr) => {
        var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;
  
      // First map the nodes of the array to an object -> create a hash table.
      for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
      }
  
      for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
          mappedElem = mappedArr[id];
          // If the element is not at the root level, add it to its parent array of children.
          if (mappedElem.parent) {
            if (mappedArr[mappedElem['parent']]) {
              mappedArr[mappedElem['parent']]['children'].push(mappedElem);
            }
          }
          // If the element is at the root level, add it to first level elements array.
          else {
            tree.push(mappedElem);
          }
        }
      }
      return tree;
    }

    const toggleModal = (modalState) => {
        if (modalState) {
            setModalTitle(modalState)
        } else {
            setShowModal(false)
            setModalTitle(null)
        }
    }

    const signIn = () => {
        setShowModal(true)
        setModalTitle("Sign In")
    }

    const onSubmit = (data) => {
        if (withAuthUser) {
            signUp()
            return false
          }
      
          setIsLoading(true)
          setMessage("")
          
      
          const token = (jsCookie.get('prototypr_token'))
          const config = {
            headers: { Authorization: "Bearer " + token }
          };
      
          axios
            .post(
              "https://prototypr.io/wp-json/wp/v2/comments/",
              {
                parent: 0,
                post: (item.ID ? item.ID : item.id ? item.id : null),
                content: data.Comment,
                author: withAuthUser.ID
              },
              config
            )
            .then(function (response) {
              if (response.status == "201") {
                //TODO: what is  EditorState
                getComments();
                setIsLoading(false)
                setMessage("")
                setComments("")
                setEditorState(EditorState.createEmpty())

              } else {
                setIsLoading(false)
                setMessage("Unable to save comment, try again later")
                
              }
            })
            .catch((error) => {
              // Error
              if (error.response) {
                setIsLoading(false)
                setMessage(error.response.data.message)
              } else if (error.request) {
                console.log(error.request);
              } else {
                setIsLoading(false)
                setMessage(error.message)
              }
            });
    }

    const getComments = () => {
        axios
        .get("https://prototypr.io/wp-json/wp/v2/comments/", {
          params: {
            _embed: '',
            post: (item.ID ? item.ID : item.id ? item.id : item.databaseId ? item.databaseId:null),
            order: 'desc',
            orderby: 'date_gmt',
            per_page: 100,
            showReplyBox: false,
            parent_id: null
          }
        })
        .then(function (response) {
          if (response.status == "200" && response.data.length > 0) {
            const comments = response.data;
            const tree = unflatten(comments);
            tree.reverse();
  
            setComments(tree)
            setOriginalComments(comments)
  
          } else if(response.status=='200'){
            const comments = response.data;
            const tree = unflatten(comments);
            tree.reverse();
  
            setComments(tree)
            setOriginalComments(comments)
          }
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
          //Perform action based on error
        });
    }

    useEffect(() => {

    }, []);

    return (
        <div>
        <h2 className={(titleClass ? titleClass:' text-lg font-medium text-gray-800')}>Add a comment</h2>
        <div className={(comments && comments.length ? 'border-b border-gray-300 pb-1' : '') + ' '}>
          <CommentForm
            formStyle="my-4"
            loading={loading}
            onSubmit={onSubmit}
            user={withAuthUser}
            isLoading={isLoading}
            defaultContent=''/>
        </div>
        <div className="marginBottom-s textAlign-center">
          <span className="divider c-silver fontWeight-3 bg-orange--d">
            {/* response block to display server errors */}
            <div>
              {(message == "")
                ? null
                : <div className="c-negative" dangerouslySetInnerHTML={{ __html: message }}></div>
              }
            </div>
          </span>
        </div>
        {originalComments && originalComments.length>0 &&
          <h2 className="text-lg font-medium text-gray-800 mt-4">{originalComments.length + (originalComments.length > 1 ? ' Responses' : ' Response')}</h2>
        }
        {comments ?
          comments.map((item, i) =>
            <CommentItem parentID={0}
              signUp={signUp}
              signIn={signIn}
              user={withAuthUser}
              comment={item}
              comments={comments}
              index={i}
              item={item}
              getComments={ getComments } />
            )
          :
          <p className="mt-4">Fetching comments...</p>
        }
        {/**TODO: SignUpModal */}
        {/* <SignUpModal modalType="Sign Up"
          modalTitle={modalTitle}
          signInSuccess={() => setUserAuthenticated(true)}
          toggleModal={(modalState) => this.toggleModal(modalState)} /> */}
      </div>
    )
}