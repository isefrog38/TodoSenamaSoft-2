import React, {memo, useState} from 'react';
import {CardTable} from "./Table/Table";
import {ProfileWrapper, TitleProfileWrapper} from '../../../StylesComponents/ProfileAndPacksWrapper';
import {Pagination} from "../../../Common/Pagination";
import {PaginationBlock} from '../../../StylesComponents/CardsWrapper';
import {Button} from "../../../Common/Buttons/Button";
import {PageSelect} from "../../../../UtilsFunction/PageSelector";
import styled from "styled-components";
import {useAppSelector, useTypedDispatch} from "../../../../Redux-Store/store";
import {getTodolistsTC} from "../../../../Thunk/Todolist-thunk";
import {AppInitialStateType, setPageCountAC, setSearchTodoAC} from "../../../../Redux-Store/App-reducer";
import {SearchInput} from "../../../Common/SearchInput/SearchInput";
import {TasksStateType} from "../../../../Redux-Store/tasks-reducer";
import {AddTaskModal} from "../../../AddTaskModal";

type AllPacksType = {
    namePage: string
    id: string
}

export const AllPacks = memo(({namePage, id}: AllPacksType) => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const stateTask = useAppSelector<TasksStateType>(state => state.tasksReducer);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    const dispatch = useTypedDispatch();

    const addPackHandler = () => setShowAddModal(true);
    const onPageChanged = (page: number) => {

    };

    const onChangeDebounceRequest = (searchTodo: string) => {
        dispatch(setSearchTodoAC({searchTodo}));
        dispatch(getTodolistsTC());
    };

    return (
        <ProfileWrapper>
            {showAddModal
                ? <AddTaskModal setShow={setShowAddModal}/>
                : <></>
            }
            <TitleProfileWrapper fontSz={1.5}>{namePage}</TitleProfileWrapper>

            <SearchBlock>
                    <SearchInput valueSearch={stateApp.searchTodo} onChangeWithDebounce={onChangeDebounceRequest}/>
                <Button name={'Add new pack'} onClick={addPackHandler}/>
            </SearchBlock>

            <CardTable itemPack={stateTask[id]} isFetching={stateApp.isFetching}/>

            <PaginationBlock>
                {200 > 10 &&
                    <>
                        <Pagination portionSize={10}
                                  totalItemsCount={200}
                                  pageSize={10}
                                  onPageChanged={onPageChanged}
                                  currentPage={1}/>
                        <ShowCardsPage>Show
                            <PageSelect value={200}
                                        onChange={(page) => dispatch(setPageCountAC({pageCount: page}))}
                                        items={[5, 10, 15, 20]}/>
                            Cards per Page</ShowCardsPage>
                    </>
                }
            </PaginationBlock>


        </ProfileWrapper>
    );
});

const ShowCardsPage = styled.div`
  display: flex;
  font-size: 0.8vw;
  align-items: center;
  justify-content: space-between;
  width: 20%;`

export const SearchBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

