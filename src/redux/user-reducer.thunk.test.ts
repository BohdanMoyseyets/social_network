import { APIResponseType, ResultCodeEnum, usersAPI } from "../api/api";
import { actions, follow, ignore } from "./users-reducer";

jest.mock("../api/api")
const userApiMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

userApiMock.follow.mockReturnValue(Promise.resolve(result))
userApiMock.ignore.mockReturnValue(Promise.resolve(result))

test('follow thunk  success',async () => {

    const thunk = follow(1)

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {})


    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followUser(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(false, 1));
})

test('ignore thunk  success',async () => {

    const thunk = ignore(1)

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {})


    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.ignoreUser(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(false, 1));
})

