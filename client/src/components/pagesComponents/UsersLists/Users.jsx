import React from 'react';
import { useSelector } from 'react-redux';
import { getActiveId } from '../../../selectors';
import UserCard from '../card/UserCard';


const Users = (props) => {
    const { UserList, openDialog, Icon, isShowLastMesg } = props
    const activeId = useSelector(getActiveId)

    return (
        <div>
            {UserList && UserList.map((item) => {
                return (
                    <UserCard
                        key={item._id}
                        item={item}
                        activeId={activeId}
                        openDialog={openDialog}
                        Icon={Icon}
                        isShowLastMesg={isShowLastMesg}
                    />
                )
            }
            )}
        </div>
    );
};

export default Users;
