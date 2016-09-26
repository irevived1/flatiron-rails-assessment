class HomeController < ApplicationController

  def index
    @note = Note.new
    @note.build_subject
    @notes = current_user.notes
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @notes}
    end
  end

end
