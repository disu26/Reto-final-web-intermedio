package co.com.sofka.questions.controller;

import co.com.sofka.questions.dto.AnswerDTO;
import co.com.sofka.questions.dto.QuestionDTO;
import co.com.sofka.questions.service.AnswerService;
import co.com.sofka.questions.service.QuestionService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public final class QuestionController {


    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/getAll")
    public Flux<QuestionDTO> getAll(){
        return questionService.getAll();
    }

    @GetMapping("/getOwnerAll/{userId}")
    public Flux<QuestionDTO> getOwnerAll(@PathVariable("userId") String userId){
        return questionService.getOwnerAll(userId);
    }

    @PostMapping("/create")
    public Mono<String> create(@RequestBody QuestionDTO questionDTO){
        return questionService.createQuestion(questionDTO);
    }

    @DeleteMapping("/delete/{id}")
    public Mono<Void> delete(@PathVariable("id") String id){
        return questionService.deleteQuestion(id);
    }
    
    @GetMapping("/pagination/{page}")
    public Flux<QuestionDTO> getPage(@PathVariable("page") Integer page){
        return questionService.getPage(page);
    }

    @GetMapping("/countQuestions")
    public Mono<Long> getCountQuestions(){
        return questionService.getCountQuestions();
    }

    @GetMapping("/totalPages")
    public Mono<Long> getTotalPages(){
        return questionService.getTotalPages();
    }

    @PutMapping("/update")
    public Mono<String> updateQuestion(@RequestBody QuestionDTO questionDTO){
        return questionService.updateQuestion(questionDTO);
    }
}
