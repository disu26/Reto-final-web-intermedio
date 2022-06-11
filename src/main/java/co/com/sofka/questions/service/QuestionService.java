package co.com.sofka.questions.service;

import co.com.sofka.questions.dto.QuestionDTO;
import co.com.sofka.questions.mapper.MapperUtils;
import co.com.sofka.questions.model.Question;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
public class QuestionService {

    private final AnswerRepository answerRepository;

    private final QuestionRepository questionRepository;

    private final MapperUtils mapperUtils;

    public QuestionService(AnswerRepository answerRepository, QuestionRepository questionRepository, MapperUtils mapperUtils){
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
    }

    public Mono<String> createQuestion(QuestionDTO newQuestion){
        return questionRepository
                .save(mapperUtils.mapperToQuestion(null).apply(newQuestion))
                .map(Question::getId);
    }

    public Mono<Void> deleteQuestion(String id){
        Objects.requireNonNull(id, "Id is required");
        return questionRepository.deleteById(id)
                .switchIfEmpty(Mono.defer(() -> answerRepository.deleteByQuestionId(id)));
    }

    public Flux<QuestionDTO> getAll(){
        return questionRepository.findAll()
                .map(mapperUtils.mapEntityToQuestion());
    }

    public Flux<QuestionDTO> getOwnerAll(String userId){
        return questionRepository.findByUserId(userId)
                .map(mapperUtils.mapEntityToQuestion());
    }

    public Mono<String> updateQuestion(QuestionDTO dto){
        Objects.requireNonNull(dto.getId(), "Id of the question is required");
        return questionRepository
                .save(mapperUtils.mapperToQuestion(dto.getId()).apply(dto))
                .map(Question::getId);
    }
    
    public Flux<QuestionDTO> getPage(Integer page){
        Long end = Long.valueOf((page+1)*10);

        return questionRepository.findAll()
                .take(end)
                .takeLast(10)
                .map(mapperUtils.mapEntityToQuestion());
    }

    public Mono<Long> getCountQuestions(){
        return questionRepository.findAll()
                .count();
    }

    public Mono<Long> getTotalPages(){
        return questionRepository.findAll()
                .count()
                .map(c -> (c+(10-(c%10)))/10);
    }
}
