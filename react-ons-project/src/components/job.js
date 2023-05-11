import React from "react";
import { useState, useEffect, useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

function Job(){
    const tableRef = useRef();
    //모달기능
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //삭제 버튼 숨기기
    const [isEdit, setIsEdit] = useState(false);

    //삭제 클릭시 핸들러
    const handleDelete = () => {
        $.ajax({
            url: 'api/delete',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ idx: data.idx }),
            success: function (response) {
                // 확인 메시지와 함께 삭제 완료
                alert('삭제되었습니다');
                handleClose();
            },
            error: function (error) {
                console.error('An error occurred:', error);
            },
        });
        handleClose();
    }

    //insert state
    const [data, setData] = useState({
        idx: '',
        title: '',
        content: '',
        writer: '',
        ndate: ''
    });

    //업데이트 클릭시 핸들러
    const handleUpdate = () => {
        $.ajax({
            url: 'api/update',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(result);
            },
            error: function(xhr, status, error) {
                console.error(status, error.toString());
            }
        });
        handleClose();
    };

    //저장 클릭시 핸들러
    const handleSave = () => {
        $.ajax({
            url: 'api/insert',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(result);
            },
            error: function(xhr, status, error) {
                console.error(status, error.toString());
            }
        });
        handleClose();
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    };

    //수정 버튼 핸들러
    const handleEdit = useCallback((row) => {
        setData(row);
        setIsEdit(true);
        handleShow();
    }, []);

    //수정 버튼 이벤트 부분
    useEffect(() => {
        $(tableRef.current).on("click", ".editButton", function () {
          const row = JSON.parse($(this).attr("data-row"));
          handleEdit(row);
        });
        return () => {
          $(tableRef.current).off("click", ".editButton");
        };
    }, [handleEdit]);

    //datatable 불러옴
    const fetchTableData = useCallback(() => {
        $(tableRef.current).DataTable({
            ajax: {
                type: 'GET',
                url: 'api/get',
            },
            columns: [
                { data: 'idx', title: 'idx' },
                { data: 'title', title: '제목' },
                { data: 'content', title: '내용' },
                { data: 'writer', title: '작성자' },
                { data: 'ndate', title: '작성일' },
                {
                    title: "수정", 
                    data: null, 
                    render: function(data, type, row, meta) {
                        const jsonRow = JSON.stringify(row);
                        return `
                            <button 
                                type="button" 
                                class="btn btn-primary editButton"
                                data-row='${jsonRow}'
                            >
                            Edit
                            </button>`;
                    }
                }                
            ],
            responsive: true,
        });
    }, []);

    useEffect(() => {
        fetchTableData();
        return () => {
            $(tableRef.current).DataTable().destroy();
        };
    }, [fetchTableData]);

    useEffect(() => {
        $(tableRef.current).DataTable().ajax.reload();
    }, [handleClose]);

    return (
        <div>
            <div>
            <Button variant="primary" onClick={handleShow}>
                추가버튼
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>상세 모달</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control name="title" type="text" placeholder="제목을 입력하세요." value={data.title} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control name="content" as="textarea" placeholder="내용을 입력하세요." rows={8} value={data.content} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="writer">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control name="writer" type="text" placeholder="작성자를 입력하세요." value={data.writer} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="ndate">
                    <Form.Label>작성일</Form.Label>
                    <Form.Control name="ndate" type="date" value={data.ndate} onChange={handleChange} />
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                {isEdit && (
                    <Button variant="danger" onClick={handleDelete}>
                    삭제
                    </Button>
                )}
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                {isEdit && (
                    <Button variant="primary" onClick={handleUpdate}>
                        업데이트
                    </Button>
                )}
                {!isEdit && (
                    <Button variant="primary" onClick={handleSave}>
                        저장
                    </Button>
                )}
                </Modal.Footer>
            </Modal>
            </div>
            <div>
            <table
                ref={tableRef}
                className='table stripe row-border order-column table-striped cell-border'
                style={{ width: '100%' }}>    
            </table>
            </div>
        </div>
    );
}

export default Job;
