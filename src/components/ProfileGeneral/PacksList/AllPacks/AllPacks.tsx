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
import {AddTaskModal} from "../../../AddTaskModal";
import {InitialStateTodolistDomainType} from "../../../../Redux-Store/todolists-reducer";

export const AllPacks = memo(() => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const stateTodo = useAppSelector<InitialStateTodolistDomainType[]>(state => state.todolistsReducer);
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
            {showAddModal && <AddTaskModal setShow={setShowAddModal}/>}
            <TitleProfileWrapper fontSz={1.5}>Todolist</TitleProfileWrapper>

            <SearchBlock>
                    <SearchInput valueSearch={stateApp.searchTodo} onChangeWithDebounce={onChangeDebounceRequest}/>
                <Button name={'Add new task'} onClick={addPackHandler}/>
            </SearchBlock>

            <CardTable itemPack={stateTodo} isFetching={stateApp.isFetching}/>

            <PaginationBlock>
                {stateApp.pagination.totalCount && stateApp.pagination.totalCount > 10 &&
                    <>
                        <Pagination portionSize={10}
                                  totalItemsCount={stateApp.pagination.totalCount}
                                  pageSize={stateApp.pagination.pageSize}
                                  onPageChanged={onPageChanged}
                                  currentPage={stateApp.pagination.page}/>
                        <ShowCardsPage>Show
                            <PageSelect value={stateApp.pagination.pageCount}
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

