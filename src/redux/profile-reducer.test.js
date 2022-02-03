import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer"


let state = {
    postsData: [
        { id: 1, data: "Post1", likeCount: 21 },
        { id: 2, data: "Post2", likeCount: 22 },
        { id: 3, data: "Post3", likeCount: 1 },
        { id: 4, data: "Post4", likeCount: 232 },
        { id: 5, data: "Post5", likeCount: 11 },
    ]
}

it("new post should be added", ()=>{
    let action = addPostActionCreator("first test");
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(6);
});

it("new post msg should be first test", ()=>{
    let action = addPostActionCreator("first test");
    let newState = profileReducer(state, action);

    expect(newState.postsData[5].data).toBe("first test");
});

it("delete post update length", ()=>{
    let action = deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(4);
});