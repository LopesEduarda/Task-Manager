import styled from "styled-components";

export const Container = styled.div`
    border: 1px solid #555;
    border-radius: 15px;
    padding: 15px;
    margin: 20px 0;
    display: flex;
    align-items: flex-start;
    background-color: #222;

    .image {
        font-size: 24px;
        margin-right: 10px;
        cursor: pointer;
    }

    .inputs {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    input, textarea {
        border: 0px;
        background: transparent;
        outline: 0;
        color: #FFF;
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 5px;
        background-color: #333;
    }

    /* Ajustando o input para ter a mesma fonte do textarea */
    input {
        font-size: 16px; /* Mesmo tamanho do textarea */
        font-weight: normal; /* Mesma espessura do texto do textarea */
    }

    textarea {
        resize: none;
        height: 50px;
        font-size: 16px; /* Mantendo igual ao input */
    }

    /* Ajusta os placeholders para ficarem iguais */
    input::placeholder, textarea::placeholder {
        color: #bbb;
        font-size: 16px;
        font-weight: normal;
    }
`;
