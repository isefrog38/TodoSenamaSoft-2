import React, {memo, useState} from 'react';
import {CardTable} from "./Table";
import {ProfileWrapper, TitleProfileWrapper} from '../stylesComponents/generalWapper';
import {Pagination} from "../common/Pagination";
import {PaginationBlock} from '../stylesComponents/wrapperAll';
import {Button} from "../common/buttons/Button";
import {PageSelect} from "../../utilsFunction/PageSelector";
import styled from "styled-components";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {getPageAC, setPageCountAC, setSearchTodoAC} from "../../reduxStore/appReducer";
import {SearchInput} from "../common/searchInput/SearchInput";
import {AddTaskModal} from "../modalWindow/addTaskModal";
import {AppInitialStateType, InitialStateTodolistDomainType} from "../../types/reducersType";

export const AllPacks = memo(() => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const stateTodo = useAppSelector<InitialStateTodolistDomainType[]>(state => state.todolistsReducer);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const dispatch = useTypedDispatch();

    const addTaskHandler = () => setShowAddModal(true);
    const onPageChanged = (page: number) => dispatch(getPageAC({page}));
    const onChangeDebounceRequest = (searchTodo: string) => dispatch(setSearchTodoAC({searchTodo}));
    const onChangePageSelector = (page: number) => {
        dispatch(setPageCountAC({pageCount: page}));
        dispatch(getPageAC({page: 1}));
    }

    return (
        <ProfileWrapper>
            {showAddModal && <AddTaskModal setShow={setShowAddModal}/>}
            <TitleProfileWrapper fontSz={1.5}>Todolist</TitleProfileWrapper>

            <SearchBlock>
                    <SearchInput valueSearch={stateApp.params.search} onChangeWithDebounce={onChangeDebounceRequest}/>
                <Button button={"button"} name={'Add new task'} onClick={addTaskHandler}/>
            </SearchBlock>

            <CardTable itemPack={stateTodo} isFetching={stateApp.isFetching}/>

            <PaginationBlock>
                    <>
                        {stateApp.totalCount && stateApp.totalCount > stateApp.params.pageSize &&
                            <Pagination portionSize={10}
                                        totalItemsCount={stateApp.totalCount}
                                        pageSize={stateApp.params.pageSize}
                                        onPageChanged={onPageChanged}
                                        currentPage={stateApp.params.page}/>
                        }
                        <ShowCardsPage>Show
                            <PageSelect value={stateApp.params.pageSize}
                                        onChange={onChangePageSelector}
                                        items={[5, 10, 15, 20]}/>
                            Cards per Page</ShowCardsPage>
                    </>

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
