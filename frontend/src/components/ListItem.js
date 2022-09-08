import React from "react";
import { Link } from "react-router-dom";

function getTitle(note) {
    let title = note.body.split("\n")[0];

    if (title.length >= 45) {
        return title.slice(0, 45);
    }
    return title;
}

function getTime(note) {
    return new Date(note.updated).toLocaleString();
}

function getContent(note) {
    let title = getTitle(note);
    let content = note.body.replaceAll("\n", " ");
    content = content.replaceAll(title, "");

    if (content.length >= 35) {
        return content.slice(0, 35) + "...";
    }
    return content;
}

const ListItem = ({ note }) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p>
                    <span>
                        {getTime(note)} - {getContent(note)}
                    </span>
                </p>
            </div>
        </Link>
    );
};

export default ListItem;
