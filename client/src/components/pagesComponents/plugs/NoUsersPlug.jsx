import React from 'react';
import s from './plugs.module.css'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';


const NoUsersPlug = () => {


    return (
        <div className={s.plug_wrapper}>
            <PanToolAltIcon color='success' fontSize='large'
                className={s.plug_hand_icon} />
            <div className={s.plug_text}>
                У вас еше нет ни одного диалога.
                Перейдите во вкладку со всеми доступными пользователями, и выбирите кому написать.
            </div>
        </div>
    );
};

export default NoUsersPlug;


