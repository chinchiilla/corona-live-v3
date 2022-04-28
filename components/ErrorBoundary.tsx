import { useTheme } from "@hooks/useTheme";
import React, { Suspense, lazy } from "react";
import { Row } from "./Layout";

const IE9Error = () => {
    return (
        <Row h='190px' w='100%' jc='center' ai='center' fontSize='13px' borderRadius='4px' textAlign='center'>
            코로나 라이브에서 지원하지 않는 브라우저 입니다
            <br></br>
            <br></br>
            다른 브라우저로 이용 부탁드립니다
        </Row>
    );
};

export class IE9ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <IE9Error></IE9Error>;
        }

        return this.props.children;
    }
}

const IE11Error = () => {
    const theme = useTheme();
    return (
        <Row
            h='190px'
            w='100%'
            jc='center'
            ai='center'
            fontSize='13px'
            borderRadius='8px'
            textAlign='center'
            bg={theme("greyBg")}
            color={theme("darkGreyText")}
            padding='20px'
            boxSizing='border-box'
        >
            코로나 라이브에서 지원하고있는 브라우저가 아니여서 제한된 기능들이 있습니다
            <br></br>
            <br></br>
            제한 없이 이용을 원하시면 다른 브라우저로 접속해주시기 바랍니다
        </Row>
    );
};

export class IE11ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <IE11Error></IE11Error>;
        }

        return this.props.children;
    }
}
