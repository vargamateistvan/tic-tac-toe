import React from 'react';
import { Square } from '../types/square';

type FieldProps = {
    square: Square;
    key: number;
    player: string;
    updateField: Function;
    setPlayer: Function;
    disabled: boolean;
}

const Field: React.FC<FieldProps> = (props) => {
    const { square, player, updateField, setPlayer, disabled } = props;
    const [field, setField] = React.useState<Square>(square);

    const handleClick = ($event: any) => {
        console.log($event, square);
        if (player === 'Player1') {
            if (square.value === 'O') {
                return;
            }
            square.value = 'X';
            setField({
                value: 'X',
                position: square.position
            });
            setPlayer('Player2');
        }

        if (player === 'Player2') {
            if (square.value === 'X') {
                return;
            }
            square.value = 'O';
            setField({
                value: 'O',
                position: square.position
            });
            setPlayer('Player1');
        }

        updateField(square);
    }

    return (
        <button
            className="square-button"
            value={field.value}
            onClick={handleClick}
            disabled={disabled}
        >
            { field.value }
        </button>
    );
}

export default Field;