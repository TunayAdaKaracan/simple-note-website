import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

const NotePage = () => {
    let noteID = useParams().id;

    let history = useNavigate();

    let [note, setNote] = useState("");

    useEffect(() => {
        getNote(noteID);
    }, [noteID]);

    let getNote = async (id) => {
        if (id === "new") return;

        let response = await fetch(`/api/notes/${id}`);
        let data = await response.json();
        setNote(data);
    };

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(note),
        }).then(() => {
            history("/");
        });
    };

    let updateNote = async () => {
        fetch(`/api/notes/${noteID}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(note),
        }).then(() => {
            history("/");
        });
    };

    let deleteNote = async () => {
        fetch(`/api/notes/${noteID}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        }).then(() => {
            history("/");
        });
    };

    let handleSubmit = () => {
        if (noteID !== "new" && !note.body) {
            deleteNote();
        } else if (noteID === "new") {
            if (note.body) {
                console.log(note);
                createNote();
            } else {
                history("/");
            }
        } else if (noteID !== "new") {
            updateNote();
        }
    };

    let handleChange = (newValue) => {
        setNote({
            ...note,
            body: newValue,
        });
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteID !== "new" ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                value={note?.body}
                autoFocus
            ></textarea>
        </div>
    );
};

export default NotePage;
