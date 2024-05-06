import React, { lazy, useCallback, useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import useQuizStyles from "../category/QuizStyle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  getAllQuestionList,
  getCategoryList,
  getFilteredQuestionList,
  postAddCategory,
  postAddQuestionexcel,
  postDeleteCategory,
  postEditCategory,
} from "../../../api";
import { useQuery } from "react-query";
import { useApp } from "../../../context/categoryContext";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useSnackbar } from "notistack";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useQuiz } from "../../../context/quizContext";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Question = () => {
  const [image, setImage] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState([]);
  const [searchByQuizId, setSearchByQuizId] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const classes = useQuizStyles();
  const { categoryList, categoryFetch, categoryLoading, categoryFetching } =
    useApp();
  const { quizList, quizLoading, quizFetching, quizFetch } = useQuiz();
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // if (Object.keys(categoryList).length === 0) {
    //     categoryFetch();
    // }
    if (Object.keys(quizList).length === 0) {
      quizFetch();
    }

    const getAllQuestion = async () => {
      const response = await getAllQuestionList();
      if (response.data.status === "ok") {
        setQuestion(response.data.response);
      } else
        enqueueSnackbar(response.data.error, {
          variant: "error",
          autoHideDuration: 2000,
        });
    };
    // getAllQuestion();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getFilteredQuestionList(
        search,
        searchByQuizId,
        page
      );
      if (response.data.status === "ok") {
        setQuestion(response.data.response.data);
        setTotalPages(response.data.response.totalPage);
        setPerPage(response.data.response.perPage);
      } else {
        enqueueSnackbar(response.data.error, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    };

    fetchQuestions();
  }, [page, search, searchByQuizId]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleImageChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handlesenddata = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    const response = await postAddQuestionexcel(formData);
    console.log(response);
  };

  const findQuizName = (quizId: any) => {
    const quiz =
      Object.keys(quizList).length > 0 &&
      question.length > 0 &&
      quizList?.response.find((data: any) => data.id === quizId);
    return quiz ? quiz.name : "";
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        className={classes.setcontainer}
      >
        <div className={classes.setpageheading}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.setheading_h4}
          >
            Category
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.setProductpaper} elevation={5}>
              <div className="flex">
                <TextField
                  type="file"
                  id="category_id"
                  size="small"
                  variant="outlined"
                  className={`m-0 w-full`}
                  placeholder="image * "
                  InputLabelProps={{ shrink: false }}
                  onChange={handleImageChnage}
                />
                {error && <span>{error}</span>}
                <div className={`ml-5`}>
                  <Button
                    variant="contained"
                    size="medium"
                    className={`m-0 ${classes.setsendbtninside}`}
                    onClick={handlesenddata}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.setProductpaper} elevation={5}>
              <div className="flex">
                <TextField
                  type="text"
                  size="small"
                  variant="outlined"
                  className={`m-0 w-full`}
                  placeholder="Search ..."
                  InputLabelProps={{ shrink: false }}
                  onChange={handleSearch}
                />
                <div
                  className="flex items-center"
                  style={{ minWidth: "170px" }}
                >
                  <Checkbox
                    color="default"
                    checked={searchByQuizId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchByQuizId(e.target.checked)
                    }
                  />
                  <span>Search by Quiz</span>
                </div>
              </div>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className={classes.tableth}>
                        No.
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Question
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Correct
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        Quiz
                      </TableCell>
                      <TableCell align="center" className={classes.tableth}>
                        action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {question.length > 0 &&
                      question.map((e: any, index: number) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell
                              align="center"
                              component="th"
                              scope="row"
                              className={classes.tabletd}
                            >
                              {(page - 1) * perPage + (index + 1)}
                            </StyledTableCell>
                            <StyledTableCell
                              className={classes.tabletd}
                              align="center"
                            >
                              {/* {e.question.substring(0, 40) + "..."} */}
                              {e.question}
                            </StyledTableCell>
                            <StyledTableCell
                              className={classes.tabletd}
                              align="center"
                            >
                              {e.correct}
                            </StyledTableCell>
                            <StyledTableCell
                              className={classes.tabletd}
                              align="center"
                            >
                              {findQuizName(e.quiz_id)}
                            </StyledTableCell>
                            <StyledTableCell
                              className={classes.tabletdicon}
                              align="center"
                            >
                              <div className="flex justify-center">
                                <div>
                                  <Tooltip title="Edit">
                                    <FaEdit className={classes.seteditincon} />
                                  </Tooltip>
                                </div>
                                <div>
                                  <Tooltip title="Remove">
                                    <FaTrashAlt
                                      className={classes.setdeleteincon}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Pagination
                page={page}
                count={totalPages}
                onChange={handleChange}
                shape="rounded"
                size="small"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Question;
