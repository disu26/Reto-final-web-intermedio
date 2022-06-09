package co.com.sofka.questions.service;

import co.com.sofka.questions.dto.AnswerDTO;
import co.com.sofka.questions.dto.QuestionDTO;
import co.com.sofka.questions.mapper.MapperUtils;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.Function;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final QuestionRepository questionRepository;

    private final MapperUtils mapperUtils;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, MapperUtils mapperUtils){
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
    }

    public Mono<QuestionDTO> addAnswer(AnswerDTO answerDTO){
        Objects.requireNonNull(answerDTO.getQuestionId(), "Id of the answer is required");
        return getQuestion(answerDTO.getQuestionId())
                    .flatMap(question ->
                        answerRepository.save(mapperUtils.mapperToAnswer().apply(answerDTO))
                                .map(answer -> {
                                    question.getAnswers().add(answerDTO);
                                    return question;
                                })
                    );
    }

    public Mono<QuestionDTO> getQuestion(String id) {
        Objects.requireNonNull(id, "Id is required");
        return questionRepository.findById(id)
                .map(mapperUtils.mapEntityToQuestion())
                .flatMap(mapQuestionAggregate());
    }

    private Function<QuestionDTO, Mono<QuestionDTO>> mapQuestionAggregate() {
        return questionDTO ->
                Mono.just(questionDTO).zipWith(
                        answerRepository.findAllByQuestionId(questionDTO.getId())
                                .map(mapperUtils.mapEntityToAnswer())
                                .collectList(),
                        (question, answers) -> {
                            question.setAnswers(answers);
                            return question;
                        }
                );
    }
}
